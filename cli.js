#!/usr/bin/env node

const concurrently = require('concurrently');
const player = require('play-sound')((opts = {}));
const path = require('path');

let elevator = player.play(path.resolve(__dirname, './bensound-theelevatorbossanova.mp3'));
let hasFinished = false;

const elevatorInterval = setInterval(() => {
    const old = elevator;

    if (!hasFinished) {
        elevator = player.play(path.resolve(__dirname, './bensound-theelevatorbossanova.mp3'));
    }
    setTimeout(() => old.kill(), 1000);
}, 224000);

const [, , ...actualArguments] = process.argv;
const commandToExecute = actualArguments.join(' ');

(async () => {
    try {
        await concurrently([commandToExecute], {
            raw: true
        });
    } finally {
        const ding = player.play(path.resolve(__dirname, './66952__benboncan__boxing-bell-1.wav'), {
            detached: true
        });

        hasFinished = true;

        ding.unref();
        elevator.kill();
        clearInterval(elevatorInterval);
    }
})();
