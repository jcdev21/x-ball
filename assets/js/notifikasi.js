if (!("Notification" in window)) {
    console.log('Browser tidak mendukung Notifikasi!');
} else {
    Notification.requestPermission()
        .then(result => {
            if (result === 'denied') {
                console.log('Fitur notifikasi tidak diizinkan.');
            } else if (result === 'default') {
                console.log('Kotak permintaan izin ditutup.');
            }

            console.log('Notifikasi diizinkan.');
        })
}

if (("PushManager" in window)) {
    navigator.serviceWorker.getRegistration()
        .then(registration => {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BLfgGbNMSBjEoSgABNm5bsf8hfksNulH2SDS01v24c3Xix_E1FxJvZswDDqUM6tdNHfYOU57tT-qImDFB7o-bh8')
            })
            .then(subscribe => {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
            })
            .catch(error => {
                console.errro('Tidak melakukan subscribe ', error.message);
            })
        })
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}