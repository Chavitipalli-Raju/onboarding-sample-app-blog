import myapp from "./myapp";

export default myapp.extend({
  namespace: 'api/v1',
  get headers(){
    return {
      "content-type": "application/json",
      "Authorization": sessionStorage.getItem("auth_token")
    };
  },
  pathForType(){
    return 'posts';
  }
});
