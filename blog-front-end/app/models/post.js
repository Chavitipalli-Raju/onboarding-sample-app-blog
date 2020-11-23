import DS from 'ember-data';
// import Model from 'ember-data/model';
const { attr }  = DS;
export default DS.Model.extend({
  postid: attr('number'),
  title: attr('string'),
  description: attr('string'),
  userid: attr('number'),
  canDelete: attr('boolean'),
  canEdit: attr('boolean'),
  createdOn: attr('string')
});
