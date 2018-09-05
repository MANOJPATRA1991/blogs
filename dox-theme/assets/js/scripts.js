( function( $ ) {
	'use strict';

	/**
	 * Hamburger icon toggle.
	 */
	$( '.js-hamburger-icon' ).on( 'click', function() {
		$( '.js-hamburger-icon' ).toggleClass( 'is-active' );
	} );

	/**
	 * Offcanvas toggle.
	 */
	$( '.js-offcanvas-toggle' ).on( 'click', function() {
		$( '.c-offcanvas' ).toggleClass( 'is-active' );
		$( '.js-logo' ).toggleClass( 'u-text-gray-300' );
	} );
}( jQuery ) );
