module.exports = function(RED) {
    var Xvfb = require('xvfb');
    console.log('about to create new Xvfb');
    var xvfb = new Xvfb();
    console.log('created Xvfb '+xvfb);

    function StartXvfb(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            console.log('before start sync');
            xvfb.startSync();
            console.log('after start sync');
            node.send(msg);
            console.log('just sent msg');
        });
    }

    function EndXvfb(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            xvfb.end(function() {});
            node.send(msg);
        });
    }
    console.log('registering nodes');
    RED.nodes.registerType("start-xvfb", StartXvfb);
    RED.nodes.registerType("end-xvfb", StartXvfb);
}