import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('posts');
  this.route('posts', {path: "/posts/:post_id"});
  this.route('newpost');
  this.route('login');
  this.route('signup');
  this.route('not-found', {path: '/*path'});
});

export default Router;
