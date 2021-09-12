import * as apiCallCreators from './apiCallCreators';
export default class ExampleApiClient {
    static getStuff() {
        return apiCallCreators.get('/stuff')
                    .then(result => result)
                    .catch(error => error.message);
    }

    static postStuff(form) {
        return apiCallCreators.post( '/stuff', form)
                    .then(result => console.log("RESULT:", result))
                    .catch(error => console.log("Error:", error));
    }

    static putStuff(stuffId, form) {
        return apiCallCreators.put(server + '/stuff/' + stuffId, form)
                    .then(result => result)
                    .catch(error => error);
    }

    static patchStuff(stuffId, form) {
        return apiCallCreators.patch(server + '/stuff/' + stuffId, form)
                    .then(result => result)
                    .catch(error => error);
    }

    static deleteStuff(stuffId) {
        return apiCallCreators.deleteCall('/stuff', stuffId)
                    .then(result => result)
                    .catch(error => error);
    }
    
}