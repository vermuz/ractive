import types from 'config/types';
import escapeHtml from 'utils/escapeHtml';
import noop from 'utils/noop';
import detach from 'parallel-dom/items/shared/detach';

var Text = function ( options ) {
	this.type = types.TEXT;
	this.text = options.template;
};

Text.prototype = {
	detach: detach,

	render: function () {
		if ( !this.node ) {
			this.node = document.createTextNode( this.text );
		}

		return this.node;
	},

	unrender: function ( shouldDestroy ) {
		if ( shouldDestroy ) {
			return this.detach();
		}
	},

	firstNode: function () {
		return this.node;
	},

	teardown: noop,

	toString: function ( escape ) {
		return escape ? escapeHtml( this.text ) : this.text;
	}
};

export default Text;
