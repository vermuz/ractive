import Model from './Model';
import { handleChange } from '../shared/methodCallers';

export default class ComputationChild extends Model {
	get () {
		const parentValue = this.parent.get();
		return parentValue ? parentValue[ this.key ] : undefined;
	}

	handleChange () {
		this.dirty = true;

		this.deps.forEach( handleChange );
		this.children.forEach( handleChange ); // TODO rename to mark once bundling glitch fixed
		this.clearUnresolveds(); // TODO is this necessary?
	}

	joinKey ( key ) {
		if ( key === undefined || key === '' ) return this;

		if ( !this.childByKey.hasOwnProperty( key ) ) {
			const child = new ComputationChild( this, key );
			this.children.push( child );
			this.childByKey[ key ] = child;
		}

		return this.childByKey[ key ];
	}
}