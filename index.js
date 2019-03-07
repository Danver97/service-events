const fs = require('fs');

function checkByObject(jsonObj, event) {
    if (!jsonObj)
        return;
    if (typeof event !== 'object')
        throw new Error('event is not object');
    Object.keys(jsonObj).forEach(k => {
        if ((typeof jsonObj[k] === 'string' && jsonObj[k] !== 'string' && jsonObj[k] !== 'number' && jsonObj[k] !== 'object')
        || typeof jsonObj[k] === 'number') {
            if (event[k] !== jsonObj[k])
                throw new Error('Wrong: value not exact');
            return;
        } else if (typeof jsonObj[k] === 'string' && typeof event[k] !== jsonObj[k]) {
            throw new Error('Wrong: type of the key is wrong');
        }
        else if (typeof jsonObj[k] === 'object') {
            const obj = jsonObj[k];
            if (obj.$or) {
                if (!obj.$or.includes(typeof event[k]))
                    throw new Error('Wrong: $or does not contains');
                return;
            } else
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

const paths = {
    reservation: {
        RESERVATION_CREATED: './jsons/reservation-events/reservation_created.json',
        RESERVATION_CONFIRMED: './jsons/reservation-events/reservation_confirmed.json',
        RESERVATION_REJECTED: './jsons/reservation-events/reservation_rejected.json',
        RESERVATION_CANCELLED: '.jsons//reservation-events/reservation_cancelled.json',
        RESTAURANT_RESERVATIONS_CREATED: './jsons/reservation-events/restaurant_reservations_created.json',
        RESERVATION_ADDED: './jsons/reservation-events/reservation_added.json',
        RESERVATION_REMOVED: './jsons/reservation-events/reservation_removed.json',
    },
    restaurant_catalog: {
        RESTAURANT_CREATED: './jsons/restaurant-catalog-events/restaurant_created.json',
        TABLE_ADDED: './jsons/restaurant-catalog-events/table_added.json',
        TABLE_REMOVED: './jsons/restaurant-catalog-events/table_removed.json',
        TABLES_ADDED: './jsons/restaurant-catalog-events/tables_added.json',
        TABLES_REMOVED: './jsons/restaurant-catalog-events/tables_removed.json',
    },
};

module.exports = {
    checkByObject,
    checkByPath,
    paths,
};
