const fs = require('fs');
const Path = require('path');

function checkByObject(jsonObj, event) {
    if (!jsonObj || typeof jsonObj !== 'object')
        return;
    if (typeof event !== 'object')
        throw new Error(`event is not object: expected something like ${JSON.stringify(jsonObj)} found ${event}`);
    Object.keys(jsonObj).forEach(k => {
        if ((typeof jsonObj[k] === 'string' && jsonObj[k] !== 'string' && jsonObj[k] !== 'number' && jsonObj[k] !== 'object')
        || typeof jsonObj[k] === 'number') {
            if (event[k] !== jsonObj[k])
                throw new Error(`Value not exact for key ${k}: expected ${jsonObj[k]} found ${event[k]}`);
            return;
        }
        if (typeof jsonObj[k] === 'string' && typeof event[k] !== jsonObj[k])
            throw new Error(`Type of the key ${k} is wrong: expected ${jsonObj[k]} found ${typeof event[k]}`);
        else if (typeof jsonObj[k] === 'object') {
            const obj = jsonObj[k];
            if (obj.$or) {
                if (!obj.$or.includes(typeof event[k]))
                    throw new Error(`Type of the key ${k} is wrong: expected ${obj.$or.join(' | ')} found ${typeof event[k]}`);
                return;
            }
            checkByObject(jsonObj[k], event[k]);
        } else if (Array.isArray(jsonObj[k])) {
            if (!Array.isArray(event[k]))
                throw new Error('Wrong: is not array');
            else
                checkByObject(jsonObj[k][0], event[k][0]);
        }
    });
}

function checkByPath(path, event) {
    const jsonObj = JSON.parse(fs.readFileSync(path, 'utf8'));
    checkByObject(jsonObj, event);
}

function toAbs(path) {
    return Path.join(__dirname, path);
}

const paths = {
    reservation: {
        RESERVATION_CREATED: toAbs('./jsons/reservation-events/reservation_created.json'),
        RESERVATION_CONFIRMED: toAbs('./jsons/reservation-events/reservation_confirmed.json'),
        RESERVATION_REJECTED: toAbs('./jsons/reservation-events/reservation_rejected.json'),
        RESERVATION_CANCELLED: toAbs('./jsons/reservation-events/reservation_cancelled.json'),
        RESTAURANT_RESERVATIONS_CREATED: toAbs('./jsons/reservation-events/restaurant_reservations_created.json'),
        RESERVATION_ADDED: toAbs('./jsons/reservation-events/reservation_added.json'),
        RESERVATION_REMOVED: toAbs('./jsons/reservation-events/reservation_removed.json'),
    },
    restaurant_catalog: {
        RESTAURANT_CREATED: toAbs('./jsons/restaurant-catalog-events/restaurant_created.json'),
        TABLE_ADDED: toAbs('./jsons/restaurant-catalog-events/table_added.json'),
        TABLE_REMOVED: toAbs('./jsons/restaurant-catalog-events/table_removed.json'),
        TABLES_ADDED: toAbs('./jsons/restaurant-catalog-events/tables_added.json'),
        TABLES_REMOVED: toAbs('./jsons/restaurant-catalog-events/tables_removed.json'),
    },
};

/* const e = {
    streamId: 'asdf',
    eventId: 1,
    message: 'restaurantCreated',
    payload:
    {
        restId: 'asdf',
        owner: 'Giucas Casella',
        timeTable: {
            Monday: '7:00-18:00',
            Tuesday: '7:00-18:00',
            Wednesday: '7:00-18:00',
            Thursday: '7:00-18:00',
            Friday: '7:00-18:00',
            Saturday: '7:00-18:00',
            Sunday: '7:00-18:00',
        },
        tables: [],
    },
};
checkByPath(paths.restaurant_catalog.RESTAURANT_CREATED, e); */

module.exports = {
    checkByObject,
    checkByPath,
    paths,
};
