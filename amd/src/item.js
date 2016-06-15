// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Item module.
 *
 * @package    block_stash
 * @copyright  2016 Frédéric Massart - FMCorz.net
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define([
], function() {

    /**
     * Item class.
     *
     * @param {Object} itemdata Data of the item.
     */
    function Item(itemdata) {
        this._data = itemdata || {};
    }
    Item.prototype._data = null;

    /**
     * Return a property of the item.
     *
     * @param {String} property The name of the property.
     * @return {Mixed}
     */
    Item.prototype.get = function(property) {
        return this._data[property];
    };

    return /** @alias module:block_stash/item */ Item;

});
