﻿CKEDITOR.plugins.add("mdn-link-customization",{requires:"link,mdn-attachment",autoCompleteTextbox:null,autoCompleteSelection:null,onLoad:function(){var a=this;CKEDITOR.on("dialogDefinition",function(b){var e=b.data.definition;"link"==b.data.name&&(e.removeContents("target"),b=e.getContents("info"),a.removeProtocolField(b),a.addArticleNameField(b),a.addAttachmentField(b),a.customizeLinkText(e),a.loadSelectedTextIntoAutoCompleteTextbox(e))})},init:function(a){a.on("dialogShow",function(b){b=b.data;
if("link"==b.getName()){var a=b.getContentElement("info","attachment");mdn.ckeditor.updateAttachments(a,b.getValueOf("info","url"))}})},removeProtocolField:function(a){a.remove("protocol");var b=this,a=a.get("url"),e=a.commit;a.onKeyUp=function(){};a.commit=function(b){e.call(this,b);b.url.protocol=""};a.setup=function(a){var c;a.url?(c=a.url.url,a.url.protocol&&(c=a.url.protocol+c),this.setValue(c)):this.setValue(b.getDefaultSlug())}},addArticleNameField:function(a){var b=this;a.add({id:"articleName",
type:"text",label:gettext("Article Title Lookup / Link Text"),setup:function(){var a=this.getDialog();b.autoCompleteSelection=null;b.autoCompleteTextbox||(b.autoCompleteTextbox=this.getElement().getElementsByTag("input").$[0],jQuery(b.autoCompleteTextbox).mozillaAutocomplete({minLength:1,requireValidOption:!0,_renderItemAsLink:!0,styleElement:b.autoCompleteTextbox.parentNode,autocompleteUrl:mdn.wiki.autosuggestTitleUrl,onSelect:function(f){b.autoCompleteSelection=f;a.setValueOf("info","url",f.url)},
buildRequestData:function(a){a.current_locale=1;return a}}));jQuery(b.autoCompleteTextbox).mozillaAutocomplete("clear")}},"urlOptions")},addAttachmentField:function(a){a.add({id:"attachment",type:"select",label:gettext("Attachments"),items:[],onChange:function(){this.getDialog().setValueOf("info","url",this.getValue())}},"articleName")},getDefaultSlug:function(){var a=jQuery("html").attr("lang"),b="";a&&(b="/"+a+"/docs/");return b},customizeLinkText:function(a){var b=this,e=a.onOk;a.onOk=function(){var a=
this.getParentEditor(),c=this._.selectedElement;e.call(this);if(!c){var d;b.autoCompleteSelection?d=b.autoCompleteSelection.label:b.autoCompleteTextbox.value&&(d=b.autoCompleteTextbox.value);if(d&&(c=a.elementPath().contains("a")))c.setText(d),d=a.createRange(),d.selectNodeContents(c),a.getSelection().selectRanges([d])}}},loadSelectedTextIntoAutoCompleteTextbox:function(a){var b=this,e=a.onFocus;a.onFocus=function(){var a=this.getParentEditor().getSelection(),c=a.getSelectedText().replace("()",""),
a=a.getSelectedElement(),d=jQuery(b.autoCompleteTextbox);c&&!a?(d.val(c),b.autoCompleteTextbox.focus(),b.autoCompleteTextbox.select(),d.mozillaAutocomplete("deselect"),d.mozillaAutocomplete("search",c)):e.call(this)}}});