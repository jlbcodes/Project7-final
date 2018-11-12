//help from Ryan Waite, Doug Brown, Yahya Elharony, Rodrick Bloomfield, Forrest
//handling GET requests from FourSquare API
class Helper {
  static baseURL(){
    return "https://api.foursquare.com/v2";
  }
  static auth(){
    const keys = {
      client_id: "LMONO5JP4GHDNPSWTKINXK1H0UFUNWJA4FIO4A0TS5BY4UZ2",
      client_secret: "4ND5NVPRKMDUXVUINITJM3YU3WSX2FG0UKVE4WN2ZHGXEENZ",
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
