this["JST"] = this["JST"] || {};

this["JST"]["post"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href="
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + " class='search-result' target='_blank'>\r\n  <div>\r\n    <h2>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n    <p>"
    + ((stack1 = ((helper = (helper = helpers.snippet || (depth0 != null ? depth0.snippet : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"snippet","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\r\n  </div>\r\n</a>\r\n";
},"useData":true});