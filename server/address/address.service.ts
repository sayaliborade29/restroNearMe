import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AddressService {

    async getResult(address: string) {
        const resp = await this.findByAddress(address);
        return await this.findByLatLong(resp);
        
    }

    async findByAddress(searchByAddress: string) {
        const url = process.env.GEOCODEURL;
        const apiKey = process.env.GEOCODEAPI;
        const dataObj = `q=${searchByAddress}&key=${apiKey}`;
        const latLag = await this.ApiRequest(url + dataObj, 'get', null, null);
        if (latLag.statusText === 'OK') {
            const result = latLag.data.results[0];
            return result ? result.geometry : "Wrong address enter....";
        } else {
            return "Wrong address enter...."
        }
    }

    async findByLatLong(searchByLatLong) {
        const url = process.env.MAPMYIDIAAPI;
        const dataObj = `divId=nearby_divId&refLocation=${searchByLatLong.lat},${searchByLatLong.lng}&keywords=restaurents`
        const headers = { Authorization: `Bearer ${process.env.MAPMYINDIATOKEN}` }
        const restro = await this.ApiRequest(url + dataObj, 'get', null, headers);
        if (restro.statusText === 'OK') {
            const result = restro.data.suggestedLocations[0];
            return result.placeName ? result.placeName : "No Restro avilable near address...."
        } else {
            return "No Restro avilable near address...."
        }
    }


    async ApiRequest(url, method, dataObj, header?) {
        try {
            const response = await axios({
                url: url,
                method: method,
                headers: header,
                responseType: 'json',
                data: dataObj
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}
