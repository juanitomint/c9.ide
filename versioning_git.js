define(function(require, exports, module) {
    "use strict";

    main.consumes = [
        "Plugin", "c9", "ui", "menus", "tabManager", "fs", "commands",
        "tree", "apf", "save"
    ];
    main.provides = ["versioning_git"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var c9 = imports.c9;
        var ui = imports.ui;
        var fs = imports.fs;
        var menus = imports.menus;
        var commands = imports.commands;

        // ui elements

        /***** Initialization *****/

        var plugin = new Plugin("Ajax.org", main.consumes);
        var emit = plugin.getEmitter();
        var readonly = c9.readonly;

        var loaded = false;

        function load(callback) {
            console.log('menumenumenumenu', menus);
            if (loaded) return false;
            loaded = true;

            commands.addCommand({
                name: "gitpull",
                hint: "Do a pull from remote",
                msg: "git pulled",
                bindKey: {
                    mac: "Ctrl-Shift-P",
                    win: "Ctrl-Shift-P"
                },
                exec: function() {
                    gitPull();
                }
            }, plugin);

            menus.addItemByPath("Tools/Git Pull", new ui.item({
                disabled: readonly,
                command: "gitPull"
            }), 100, plugin);

        }

        function gitPull() {
            alert("Pull Success!");
        }

        /***** Lifecycle *****/

        plugin.on("load", function() {
            load();
        });
        plugin.on("enable", function() {

        });
        plugin.on("disable", function() {

        });
        plugin.on("unload", function() {
            loaded = false;
        });

        /***** Register and define API *****/

       
        plugin.freezePublicAPI({
            /**
             * Makes a git pull from remote
             *
             */
            gitPull: gitPull,

        });

        register(null, {
            versioning_git: plugin
        });
    }
});