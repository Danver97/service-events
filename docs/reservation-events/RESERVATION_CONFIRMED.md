# Reservation Confirmed Event
As described in [Base Event](../BASE_EVENT.md) the only field that would be described is `payload`. The `message` value will be `reservationConfirmed` (**camelCase**).

## Payload
Will follow the following format:
```
{
    ...
    "payload": {
        "resId": string,
        "restId": string,
        "status": "confirmed",
        "table": {
            "id": string,
            "people": number
        }
    }
}
```
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resId` | string | Yes | The reservation's id (will have the same value of `streamId`) |
| `restId` | string | Yes | The restaurant's id |
