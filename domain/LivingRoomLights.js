class LivingRoomControl {
    constructor(url) {
        this.url = url;
    }

    setOn(groupKey){
        const options = {
            method: 'PUT',
            uri: 'http://192.168.2.10/api/G9dOkDFP3bXMVN6tL4feIYyxIzyw7aoZOZe-Z5t4/groups/'+groupKey+'/action',
            body: {
                "on" : true,
                "bri": 254,
                "hue": 8597,
                "sat": 121
            },
            json: true
        };
        
        return rp(options);
    }

    setOff(groupKey){
        const options = {
            method: 'PUT',
            uri: 'http://192.168.2.10/api/G9dOkDFP3bXMVN6tL4feIYyxIzyw7aoZOZe-Z5t4/groups/'+groupKey+'/action',
            body: {
                "on" : false
            },
            json: true
        };
        
        return rp(options);
    }
}
