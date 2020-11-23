import DS from 'ember-data';
// import Model from 'ember-data/model';
const { attr }  = DS;

export default DS.Model.extend({
  username: attr('string'),
  fullname: attr('string')
});
