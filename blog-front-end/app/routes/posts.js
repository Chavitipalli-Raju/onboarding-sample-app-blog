import Ember from 'ember';
import DS from 'ember-data';

const { UnauthorizedError } = DS;

export default Ember.Route.extend({
  model(params){
    const { post_id } = params;
    if(post_id === undefined){
      return this.store.findAll('post');
    } else {
      return this.store.find('post', post_id);
    }
  },

  actions: {
    error(error, transition) {
      if (error instanceof UnauthorizedError) {
        // go to the sign in route
        sessionStorage.clear();
        this.transitionTo('login');
      }
    },
    deletePost(postid){
      let post = this.store.peekRecord('post', postid);
      post.destroyRecord();
    }
  }
});
