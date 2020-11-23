import Ember from 'ember';
import DS from 'ember-data';

const { UnauthorizedError } = DS;

export default Ember.Route.extend({
  model(){
    return {
      isLogin : sessionStorage.getItem("auth_token") !== null,
      username : sessionStorage.getItem("userfullname")
    };
  },
  actions: {
    error(error, transition) {
      if (error instanceof UnauthorizedError) {
        sessionStorage.clear();
        this.transitionTo('login');
      }
    },

    showMessage(msg, isError){
      console.log(msg);
      const color = isError ? "red" : "green";
      document.getElementById("message").innerHTML = "<p style=\"color: " + color + " \"> " + msg + "</p>";
    },

    login: function(){
      const url = "http://localhost:3000";
      const data = JSON.stringify({
        username : document.getElementById("username").value.toString(),
        password : document.getElementById("password").value.toString()
      });
      const other_params = {
        method : "POST",
        headers : { "Content-Type" : "application/json; charset=UTF-8"},
        body : data
      };
      fetch(url + "/authenticate", other_params).then(
        function (response){
          if(response.ok){
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        }
      ).then(function (data){
        sessionStorage.setItem("auth_token", data["auth_token"]);
        sessionStorage.setItem("userfullname", data["user"]["fullname"]);
        sessionStorage.setItem("userid", data["user"]["userid"]);
        sessionStorage.setItem("isadmin", data["user"]["isadmin"]);

        document.getElementById("message").innerHTML = "<p style=\"color: green\">Login Successful</p>";

        window.location.replace("/posts");
      }).catch(function (error){
        console.log(error);
        document.getElementById("message").innerHTML = "<p style=\"color: red\">Invalid Credentials</p>";
      });
      return false;
    },

    signup: function (){
      const url = "http://localhost:3000/users";
      const username = document.getElementById("username").value.toString();
      const password = document.getElementById("password").value.toString();
      const password_conf = document.getElementById("password_confirmation").value.toString();
      const fullname = document.getElementById("fullname").value.toString();
      if(password.toString().trim() !== password_conf.toString().trim()){
        this.actions.showMessage("Password and Confirmation password should be same", true);
        return false;
      }
      const data = JSON.stringify({username : username, password : password, fullname : fullname});
      const other_params = {
        method : "POST",
        headers : { "Content-Type" : "application/json; charset=UTF-8"},
        body : data
      };
      fetch(url, other_params).then(
        function (response){
          if(response.status === 201){
            return response.json();
          } else if(response.status === 432){
            throw new Error("User already exist");
          } else if(response.status === 433){
            throw new Error("Username length should between 5 and 15");
          } else if(response.status === 434){
            throw new Error("Password length should be at least 6");
          } else{
            throw new Error("Not able to create user");
          }
        }
      ).then(function (data){
        document.getElementById("message").innerHTML = `<p style=\"color: green\">Successfully created user</p>`;
        window.location.replace('/login');
      }).catch(function (error){
          document.getElementById("message").innerHTML = "<p style=\"color: red\">" + error.message + "</p>";
      });
      return false;
    },

    logout: function (){
      sessionStorage.clear();
      window.location.replace('/login');
    },

    createPost: function (){
      const url = "http://localhost:3000/api/v1/posts";
      const title = document.getElementById("post-title-input").value.toString();
      const body = document.getElementById("post-body-input").value.toString();
      const data = JSON.stringify({title : title, description : body});
      const other_params = {
        method : "POST",
        headers : { "Content-Type" : "application/json; charset=UTF-8", "Authorization" : sessionStorage.getItem("auth_token")},
        body : data
      };
      fetch(url, other_params).then(
        function (response){
          if(response.status === 201){
            return response.json();
          } else if(response.status === 401){
            window.location.replace("/login");
          } else {
            throw new Error(JSON.stringify(response));
          }
        }
      ).then(function (data){
        window.location.replace('/posts');
      }).catch(function (error){
        error = error.toString();
        document.getElementById("message").innerHTML = `<p style=\"color: red\">${{error}}</p>`;
      });
    },

    editPost: function (){
      const url = "http://localhost:3000/api/v1/posts";
      const title = document.getElementById("post-title-input").value.toString();
      const body = document.getElementById("post-body-input").value.toString();
      const data = JSON.stringify({title : title, description : body});
      const other_params = {
        method : "PUT",
        headers : { "Content-Type" : "application/json; charset=UTF-8", "Authorization" : sessionStorage.getItem("auth_token")},
        body : data
      };
      fetch(url, other_params).then(
        function (response){
          if(response.status === 200){
            return response.json();
          } else if(response.status === 401){
            window.location.replace("/login");
          }else {
            throw new Error(JSON.stringify(response));
          }
        }
      ).then(function (data){
        document.getElementById("message").innerHTML = "<p style=\"color: green\">Successfully created post</p>";
      }).catch(function (error){
        error = error.toString();
        document.getElementById("message").innerHTML = `<p style=\"color: red\">${{error}}</p>`;
      });
    }
  }
});
