# Restaurant Reservations Created Event
As described in [Base Event](../BASE_EVENT.md) the only field that would be described is `payload`. The `message` value will be `restaurantReservationsCreated` (**camelCase**).

## Payload
Will follow the following format:
```
{
    ...
    "payload": {
        "restId": string,
        "timeTable": string,
        "tables": [],
    }
}
```
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `restId` | string | Yes | The restaurant reservations' id (same value of `streamId`) |
| `timeTable` | number | Yes | The restaurant's timetable |
| `tables` | string | No | The restaurant's tables |
