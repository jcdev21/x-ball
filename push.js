const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLfgGbNMSBjEoSgABNm5bsf8hfksNulH2SDS01v24c3Xix_E1FxJvZswDDqUM6tdNHfYOU57tT-qImDFB7o-bh8",
    "privateKey": "9b2DYcAoftw4H9EIVdkqiKIFxQ1Zlxco3tCvEh9v5Qo"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d-Pixt3La0I:APA91bFcQRkYh_bHlDmsJXDUR_9IFHwqh5YPmprvSdWjbYmv_AX_csbH__Eu4NepmMupSap8BQh9UYzu0BVqfZG-90nPvIoXLmdfp36D5YENnzkctv5UyHV-Q2CrFD8tyqscdP51l7-9",
    "keys": {
        "p256dh": "BPFLjRlK73BBsD/kU3XJpwDfHzk2HIo87nPCwUJliNirYV18mjQ8fjsrVXZ350Bt1HRYTpt6kllAx+62x54TyPk=",
        "auth": "txo5krce8dY4PA6coOx7kg=="
    }
};

var payload = "Notifikasi dari X-Ball, seputar sepak bola!";

var options = {
    gcmAPIKey: "719078753025",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);