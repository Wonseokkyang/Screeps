var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');


module.exports.loop = function () {

    //get rid of memory of names to save space
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //auto creating creeps
    //
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');

    //announcing current creeps to console
    if( (Game.time % 10) == 0){
        console.log('=================================');
        console.log('Harvesters: ' + harvesters.length);
        console.log('Builders: ' + builders.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Repairers: ' + repairers.length);
        console.log('Miners: ' + miners.length);
        console.log('Haulers: ' + haulers.length);
    }

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    else if(builders.length < 2) {
        var newName1 = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName1);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY, CARRY,MOVE], newName1, 
            {memory: {role: 'builder'}});
    }
    
    else if(upgraders.length < 1) {
        var newName2 = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName2);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName2, 
            {memory: {role: 'upgrader'}});
    }
    
    else if(repairers.length < 1) {
        console.log('Spawning new repairer: ' + 'Repairer'+Game.time);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Repairer'+Game.time, 
            {memory: {role: 'repairer'}});
    }

    else if(miners.length < 2) {
        console.log('Spawning new miner: ' + 'Miner'+Game.time);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,MOVE], 'Miner'+Game.time, 
            {memory: {role: 'miner'}});
    }

    else if(haulers.length < 1) {
        console.log('Spawning new hauler: ' + 'Hauler'+Game.time);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY, WORK,MOVE,MOVE], 'Hauler'+Game.time, 
            {memory: {role: 'hauler'}});
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
    }

    //plying with code here
    var sources = creep.room.find(FIND_SOURCES);

    Game.spawns['Spawn1'].room.visual.text('test print'+sources,
            Game.spawns['Spawn1'].pos.x -10, 
            Game.spawns['Spawn1'].pos.y + 3, 
            {align: 'left', opacity: 0.8});
}