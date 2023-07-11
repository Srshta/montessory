const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        fatherName: {
            type: String,
            required: false,
            default: "no"
        },
        mobileNumber: {
            type: String,
            unique: false,
            required: true,
        },
        fatherMobileNumber: {
            type: String,
            unique: false,
            required: false,
        },
        email: {
            type: String,
            unique: false,
            required: false,
        },

        sounds: {
            SPL: {
                type: Boolean,
                default: false
            },
            a: {
                type: Boolean,
                default: false
            },
            i: {
                type: Boolean,
                default: false
            },
            o: {
                type: Boolean,
                default: false
            },
            u: {
                type: Boolean,
                default: false
            },
            e: {
                type: Boolean,
                default: false
            },
            m: {
                type: Boolean,
                default: false
            },
            n: {
                type: Boolean,
                default: false
            },
            r: {
                type: Boolean,
                default: false
            },
            s: {
                type: Boolean,
                default: false
            },
            l: {
                type: Boolean,
                default: false
            },
            f: {
                type: Boolean,
                default: false
            },
            h: {
                type: Boolean,
                default: false
            },
            v: {
                type: Boolean,
                default: false
            },
            y: {
                type: Boolean,
                default: false
            },
            z: {
                type: Boolean,
                default: false
            },
            w: {
                type: Boolean,
                default: false
            },
            k: {
                type: Boolean,
                default: false
            },
            t: {
                type: Boolean,
                default: false
            },
            p: {
                type: Boolean,
                default: false
            },
            b: {
                type: Boolean,
                default: false
            },
            d: {
                type: Boolean,
                default: false
            },
            g: {
                type: Boolean,
                default: false
            },
            j: {
                type: Boolean,
                default: false
            },
            c: {
                type: Boolean,
                default: false
            },
            x: {
                type: Boolean,
                default: false
            },
            q: {
                type: Boolean,
                default: false
            },
        },
       
        movableAlphabets: {
            Vowel1: {
        type: Boolean,
        default: false
    },
    Vowel2: {
        type: Boolean,
        default: false
    },
    Vowel3: {
        type: Boolean,
        default: false
    },
    j: {
        type: Boolean,
        default: false
    },
     e: {
        type: Boolean,
        default: false
    },
    sh: {
        type: Boolean,
        default: false
    },
     ch: {
        type: Boolean,
        default: false
    },
    th: {
        type: Boolean,
        default: false
    }, 
    ng: {
        type: Boolean,
        default: false
    },
    oo: {
        type: Boolean,
        default: false
    },
    AtoE: {
        type: Boolean,
        default: false
    },
     ItoE: {
        type: Boolean,
        default: false
    },
    OtoE: {
        type: Boolean,
        default: false
    },
     UtoE1: {
        type: Boolean,
        default: false
    },
    UtoE2: {
        type: Boolean,
        default: false
    }, 
    le: {
        type: Boolean,
        default: false
    },
    qu: {
        type: Boolean,
        default: false
    },
     ssggll: {
        type: Boolean,
        default: false
    },
    HPvowel: {
        type: Boolean,
        default: false
    },
    HPconst: {
        type: Boolean,
        default: false
    },
    HGvowel: {
        type: Boolean,
        default: false
    },
    HGconst: {
        type: Boolean,
        default: false
    },
   
},
    // password:{
    //     type: String,
    //     required: true,
    // },
    address: {
    type: String,
    required: false,
},
    selectCity: {
    type: String,
    required: false,
},
    doa: {
    type: String,
    required: true,
},
    allergies: {
    type: String,
    required: false,
    default: "no"
},
        // roleType:{
        //     type: String,
        //     required: true,
        // }
    },
{
    timestamps: true,
    }
);

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
module.exports = Student;