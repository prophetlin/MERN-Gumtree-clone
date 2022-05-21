import bcrypt from 'bcryptjs';
const data = {
    users: [{
            name: 'Alan',
            email: 'yuefuk123@gmail.com',
            password: bcrypt.hashSync('kaboom', 8),
            isAdmin: true,
        },
        {
            name: 'TourBot',
            email: 'meh1000993@gmail.com',
            password: bcrypt.hashSync('hotchick123', 8),
            isAdmin: false,
        }
    ],

    listings: [{

            title: 'Razer Blade laptop 2019 used for sale',
            category: 'Electronics',
            image: './images/rb15.jpg',
            price: '1600',
            location: 'Perth',
            detail: 'CPU: i7 9750H GPU: 1660ti. selling my used laptop due to upgrading, \n\n  laptop is in perfect condition except it doesn\'t work sometimes',
            condition: 'Used',
            dateListed: '05/02/2021',
            negotiable: true

        },
        {

            title: 'Lamborghini Egoista',
            category: 'Vehicles',
            image: './images/lambo.jpg',
            price: '117000000',
            location: 'Sant Agata Bolognese,Italy',
            detail: 'Originally unveiled in 2013, the Lamborghini Egoista was designed to celebrate the company\'s 50th anniversary \n\n As it turns out, it all starts with the name,\n\n but its impressive design and powerful engine also play a part in it. The vehicle currently resides in Sant\'Agata Bolognese, Italy at the Lamborghini museum.',
            condition: 'Used',
            dateListed: '05/02/2021',
            negotiable: false
        },
        {

            title: "My little brother's Nike shoes",
            category: 'Miscellaneous',
            image: './images/nike.jpg',
            price: '35',
            location: 'Hobart',
            detail: 'When it comes to innovative sportswear, no brand does it better than Nike. \n\n Discover the best-selling sneakers in the game in our Nike at ASOS edit, from Air Force 1s to super-cushioned VaporMax styles.\n\n but my brother grown up and dont\'t want it no more so im selling it for cheap',
            condition: 'Used',
            dateListed: '05/02/2021',
            negotiable: true
        },
        {

            title: "Gynoid doll Ellena",
            category: 'Miscellaneous',
            image: './images/doll.jpg',
            price: '4000',
            location: 'Melborne',
            detail: 'This is the first doll from Gynoid Tech that has all fixed limbs. \n\nNo arm or thigh seams on Elena. \n\nHer head is not fixed and therefore her head can be interchanged with others from the Gynoid Tech range. \n\nElena has the new Gynoid metal hand skeleton which is a world first.',
            condition: 'Used',
            dateListed: '05/02/2021',
            negotiable: false
        }
    ]
}

export default data;