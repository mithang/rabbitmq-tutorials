#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqps://ovzrrekn:mIg6vY9ktyaCJcz9_KTnRYuPn1bIWUFL@shark.rmq.cloudamqp.com/ovzrrekn', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'topic_logs';
        var args = process.argv.slice(2);
        var key = (args.length > 0) ? args[0] : 'anonymous.info';
        var msg = args.slice(1).join(' ') || 'Hello World!';

        channel.assertExchange(exchange, 'topic', {
            durable: false
        });
        channel.publish(exchange, key, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", key, msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
