const concurrently = require('concurrently');
const player = require('play-sound')((opts = {}));

let elevator = player.play('./elevator.mp3', onElevatorFinished);
let hasFinished = false;

function onElevatorFinished(err) {
    if (err && !err.killed) throw err;

    if (!hasFinished) {
        elevator = player.play('./elevator.mp3', onElevatorFinished);
    }
}

const [, , ...actualArguments] = process.argv;
const commandToExecute = actualArguments.join(' ');

concurrently([commandToExecute], {
    raw: true
})
    .catch(() => {})
    .then(() => {
        const ding = player.play('./ding.mp3', { detached: true });

        hasFinished = true;

        ding.unref();
        elevator.kill();
    });
