import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const matchDetailsSchema = new Schema({
    _Match: {
        type: Schema.Types.ObjectId,
        ref: 'match'
    },
        Assists: {
          type: Number
        },
        BanId1: {
          type: Number
        },
        BanId2: {
          type: Number
        },
        BanId3: {
          type: Number
        },
        BanId4: {
          type: Number
        },
        BanId5: {
          type: Number
        },
        BanId6: {
          type: Number
        },
        BanId7: {
          type: Number
        },
        BanId8: {
          type: Number
        },
        Ban_1: {
          type: Schema.Types.Mixed
        },
        Ban_2: {
          type: Schema.Types.Mixed
        },
        Ban_3: {
          type: Schema.Types.Mixed
        },
        Ban_4: {
          type: Schema.Types.Mixed
        },
        Ban_5: {
          type: Schema.Types.Mixed
        },
        Ban_6: {
          type: Schema.Types.Mixed
        },
        Ban_7: {
          type: Schema.Types.Mixed
        },
        Ban_8: {
          type: Schema.Types.Mixed
        },
        ChampionId: {
          type: Number
        },
        Damage_Bot: {
          type: Number
        },
        Damage_Done_In_Hand: {
          type: Number
        },
        Damage_Done_Magical: {
          type: Number
        },
        Damage_Done_Physical: {
          type: Number
        },
        Damage_Mitigated: {
          type: Number
        },
        Damage_Player: {
          type: Number
        },
        Damage_Taken: {
          type: Number
        },
        Damage_Taken_Magical: {
          type: Number
        },
        Damage_Taken_Physical: {
          type: Number
        },
        Deaths: {
          type: Number
        },
        Gold_Earned: {
          type: Number
        },
        Healing: {
          type: Number
        },
        Healing_Bot: {
          type: Number
        },
        Healing_Player_Self: {
          type: Number
        },
        ItemId1: {
          type: Number
        },
        ItemId2: {
          type: Number
        },
        ItemId3: {
          type: Number
        },
        ItemId4: {
          type: Number
        },
        ItemId5: {
          type: Number
        },
        ItemId6: {
          type: Number
        },
        ItemLevel1: {
          type: Number
        },
        ItemLevel2: {
          type: Number
        },
        ItemLevel3: {
          type: Number
        },
        ItemLevel4: {
          type: Number
        },
        ItemLevel5: {
          type: Number
        },
        ItemLevel6: {
          type: Number
        },
        Item_Active_1: {
          type: String
        },
        Item_Active_2: {
          type: String
        },
        Item_Active_3: {
          type: String
        },
        Item_Active_4: {
          type: String
        },
        Item_Purch_1: {
          type: String
        },
        Item_Purch_2: {
          type: String
        },
        Item_Purch_3: {
          type: String
        },
        Item_Purch_4: {
          type: String
        },
        Item_Purch_5: {
          type: String
        },
        Item_Purch_6: {
          type: String
        },
        Killing_Spree: {
          type: Number
        },
        Kills_Bot: {
          type: Number
        },
        Kills_Double: {
          type: Number
        },
        Kills_Fire_Giant: {
          type: Number
        },
        Kills_First_Blood: {
          type: Number
        },
        Kills_Gold_Fury: {
          type: Number
        },
        Kills_Penta: {
          type: Number
        },
        Kills_Phoenix: {
          type: Number
        },
        Kills_Player: {
          type: Number
        },
        Kills_Quadra: {
          type: Number
        },
        Kills_Siege_Juggernaut: {
          type: Number
        },
        Kills_Single: {
          type: Number
        },
        Kills_Triple: {
          type: Number
        },
        Kills_Wild_Juggernaut: {
          type: Number
        },
        League_Losses: {
          type: Number
        },
        League_Points: {
          type: Number
        },
        League_Tier: {
          type: Number
        },
        League_Wins: {
          type: Number
        },
        Map_Game: {
          type: String
        },
        Mastery_Level: {
          type: Number
        },
        Match: {
          type: Number
        },
        Match_Duration: {
          type: Number
        },
        Multi_kill_Max: {
          type: Number
        },
        Objective_Assists: {
          type: Number
        },
        PartyId: {
          type: Number
        },
        Reference_Name: {
          type: String
        },
        Team1Score: {
          type: Number
        },
        Team2Score: {
          type: Number
        },
        TeamId: {
          type: Number
        },
        Time_In_Match_Seconds: {
          type: Number
        },
        Win_Status: {
          type: String
        },
        Winning_TaskForce: {
          type: Number
        },
        playerId: {
          type: String
        },
        playerName: {
          type: String
        }
}, {collection: 'matches_details'})

export default mongoose.model('matchDetails', matchDetailsSchema);

/*
Account_Level: 103,
    ActiveId1: 12010,
    ActiveId2: 13224,
    ActiveId3: 13071,
    ActiveId4: 0,
    ActiveLevel1: 0,
    ActiveLevel2: 0,
    ActiveLevel3: 0,
    ActiveLevel4: 0,
    ActivePlayerId: '711681565',
    Assists: 1,
    BanId1: 2393,
    BanId2: 2420,
    BanId3: 2322,
    BanId4: 2477,
    BanId5: 2479,
    BanId6: 2481,
    BanId7: 2548,
    BanId8: 0,
    Ban_1: 'Willo',
    Ban_2: 'Zhin',
    Ban_3: 'Torvald',
    Ban_4: 'Terminus',
    Ban_5: 'Khan',
    Ban_6: 'Moji',
    Ban_7: 'Azaan',
    Ban_8: null,
    Camps_Cleared: 0,
    ChampionId: 2493,
    Damage_Bot: 0,
    Damage_Done_In_Hand: 27097,
    Damage_Done_Magical: 0,
    Damage_Done_Physical: 31702,
    Damage_Mitigated: 0,
    Damage_Player: 31702,
    Damage_Taken: 13929,
    Damage_Taken_Magical: 0,
    Damage_Taken_Physical: 13929,
    Deaths: 7,
    Distance_Traveled: 0,
    Entry_Datetime: '4/3/2024 8:39:43 AM',
    Final_Match_Level: 0,
    Gold_Earned: 955,
    Gold_Per_Minute: 148,
    Healing: 0,
    Healing_Bot: 0,
    Healing_Player_Self: 2525,
    ItemId1: 23471,
    ItemId2: 23478,
    ItemId3: 23464,
    ItemId4: 23472,
    ItemId5: 23515,
    ItemId6: 23482,
    ItemLevel1: 2,
    ItemLevel2: 5,
    ItemLevel3: 5,
    ItemLevel4: 2,
    ItemLevel5: 1,
    ItemLevel6: 0,
    Item_Active_1: 'Life Rip',
    Item_Active_2: 'Veteran',
    Item_Active_3: 'Wrecker',
    Item_Active_4: '',
    Item_Purch_1: 'Swift Hands',
    Item_Purch_2: Wind's Embrace,
    Item_Purch_3: 'Harsh Training',
    Item_Purch_4: 'Raw Talent',
    Item_Purch_5: 'Gale Storm',
    Item_Purch_6: 'Dragon Fangs',
    Killing_Spree: 1,
    Kills_Bot: 2,
    Kills_Double: 0,
    Kills_Fire_Giant: 0,
    Kills_First_Blood: 0,
    Kills_Gold_Fury: 0,
    Kills_Penta: 0,
    Kills_Phoenix: 23461,
    Kills_Player: 0,
    Kills_Quadra: 0,
    Kills_Siege_Juggernaut: 0,
    Kills_Single: 0,
    Kills_Triple: 0,
    Kills_Wild_Juggernaut: 2,
    League_Losses: 7,
    League_Points: 79,
    League_Tier: 6,
    League_Wins: 7,
    Map_Game: 'Ranked Fish Market',
    Mastery_Level: 51,
    Match: 1249984661,
    Match_Duration: 360,
    MergedPlayers: null,
    Minutes: 6,
    Multi_kill_Max: 0,
    Objective_Assists: 7,
    PartyId: 773299,
    Platform: 'Steam',
    Rank_Stat_League: 0,
    Reference_Name: 'Koga',
    Region: 'NA',
    Skin: 'Default Koga',
    SkinId: 23448,
    Structure_Damage: 0,
    Surrendered: 0,
    TaskForce: 2,
    Team1Score: 4,
    Team2Score: 0,
    TeamId: 0,
    Team_Name: '',
    Time_In_Match_Seconds: 385,
    Towers_Destroyed: 0,
    Wards_Placed: 0,
    Win_Status: 'Loser',
    Winning_TaskForce: 1,
    hasReplay: 'n',
    hz_gamer_tag: null,
    hz_player_name: null,
    match_queue_id: 486,
    name: 'Ranked',
    playerId: '711681565',
    playerName: '今日のパンツは赤です',
    playerPortalId: '5',
    playerPortalUserId: '76561198001061452',
    ret_msg: null
*/