import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: "postid",
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType){
    payload.forEach(function (post){
      post["canEdit"] = !!(post["userid"].toString() === sessionStorage.getItem("userid").toString() ||
        sessionStorage.getItem("isadmin").toString() === "1");
      post["canDelete"] = !!(post["userid"].toString() === sessionStorage.getItem("userid").toString() ||
        sessionStorage.getItem("isadmin").toString() === "1");
    });
    payload = {posts: payload};
    console.log(payload);
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType){
    payload["canEdit"] = !!(payload["userid"].toString() === sessionStorage.getItem("userid").toString() ||
      sessionStorage.getItem("isadmin").toString() === "1");
    payload["canDelete"] = !!(payload["userid"].toString() === sessionStorage.getItem("userid").toString() ||
      sessionStorage.getItem("isadmin").toString() === "1");
    payload = {post: payload};
    console.log(payload);

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeDeleteRecordResponse(store, primaryModelClass, payload, id, requestType){
    // payload = {"message" : payload};
    // console.log(payload);

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
