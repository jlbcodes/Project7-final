//help from Ryan Waite, Doug Brown, Yahya Elharony, Rodrick Bloomfield, Forrest
//handling GET requests from FourSquare API
class Helper {
  static baseURL(){
    return "https://api.foursquare.com/v2";
  }
  static auth(){
    const keys = {
      client_id: "NPOMURICWENX1VXKDGOBAG2DFU1NDYSFT3ZJ4MWCCD5Y4WBX",
      client_secret: "23USOBB22ZUNMYW3JZYBAICL1PJ30D5XNSNJ21ZPYEGSONDQ",
      v: 20181111
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(urlPrams){
    if(!urlPrams){
      return ""
    }
    return Object.keys(urlPrams)
      .map(key => `${key}=${urlPrams[key]}`)
      .join("&")
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint,method,urlPrams){
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
      urlPrams
    )}`,
    requestData
  ).then(res => res.json());
  }
}

export default class SquareAPI {
  static search(urlPrams) {
    return Helper.simpleFetch("/venues/search", "GET", urlPrams);
  }
  static getVenueDetails(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET")
  }
  static getVenuePhotos(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
