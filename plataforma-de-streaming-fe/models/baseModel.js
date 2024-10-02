    export default class BaseModel {

        constructor() {

        }

    toJSON() {
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        let json = {};
        for(let prop of props) {    
            if(this[prop])
            {
                let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), prop);
                if(descriptor && (descriptor.get || descriptor.set))
                    json[prop] = this[prop];
            }
        }

        return json;
    }
}