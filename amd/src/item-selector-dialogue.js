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
 * Dialogue for picking an item
 *
 * @package    block_stash
 * @copyright  2019 Adrian Greeve <adriangreeve.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define([
    'jquery',
    'block_stash/dialogue-base',
    'core/templates',
    'core/ajax',
    'core/str'
], function($, DialogueBase, Templates, Ajax, Str) {

    /**
     * A dialogue to show a user's item
     *
     * @param {int} userid The user id.
     * @param {int} courseid The course id.
     * @param {string} sesskey Session key.
     * @param {Array} warnings List of warnings.
     */
    function ItemSelector(userid, courseid, sesskey, warnings) {
        this._userid = userid;
        this._courseid = courseid;
        this._sesskey = sesskey;
        this._warnings = warnings;
        DialogueBase.prototype.constructor.apply(this, []);
    }
    ItemSelector.prototype = Object.create(DialogueBase.prototype);
    ItemSelector.prototype.constructor = ItemSelector;

    ItemSelector.prototype._userid = null;
    ItemSelector.prototype._courseid = null;
    ItemSelector.prototype._sesskey = null;
    ItemSelector.prototype._warnings = null;

    /**
     * Render the ItemSelector.
     *
     * @method _render
     * @return {Promise}
     */
    ItemSelector.prototype._render = function() {

        // Need to go fetch all items for display.
        var ajaxpromise = Ajax.call([{
            methodname: 'block_stash_get_items',
            args: {
                courseid: this._courseid
            }
        }]);
        var stringpromise = Str.get_string('additem', 'block_stash');
        return $.when(ajaxpromise[0], stringpromise).then((ajaxvalues, stringvalues) => {
            var context = {
                userid: this._userid,
                courseid: this._courseid,
                items: ajaxvalues.items,
                sesskey: this._sesskey,
                warnings: this._warnings
            };
            Templates.render('block_stash/item_select_dialogue', context).then((html, js) => {
                this.setTitle(stringvalues);
                this._setDialogueContent(html);
                this.center();
                Templates.runTemplateJS(js);
            });
        });
    };

    return /** @alias module:block_stash/drop-snippet-dialogue */ ItemSelector;

});