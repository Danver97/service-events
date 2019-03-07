# Service events
Events used by services in TheForkReplica project

## Usage
```js
const checkUtility = require('@danver97/service-events');
```

`checkUtility` is an object with the following fields.
- `checkByObject`: is a function that checks if the provided event satisfy the structure provided as object
- `checkByPath`:  is a function that checks if the provided event satisfy the structure provided as a path to the json hold by the module
- `paths`: a short-hand for the json's paths

### checkByObject(obj, event)
If the `event` doesn't satisfy the requirements described in `obj` throws an error.

### checkByPath(path, event)
If the `event` doesn't satisfy the requirements described in json under `path` throws an error.

### paths
It's an object the following fields and subfields:
- reservation
  - RESERVATION_CREATED
  - RESERVATION_CONFIRMED
  - RESERVATION_REJECTED
  - RESERVATION_CANCELLED
  - RESTAURANT_RESERVATIONS_CREATED
  - RESERVATION_ADDED
  - RESERVATION_REMOVED
- restaurant_catalog
  - RESTAURANT_CREATED
  - TABLE_ADDED
  - TABLE_REMOVED
  - TABLES_ADDED
  - TABLES_REMOVED
