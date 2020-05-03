import {getUserLocale, getPageFromLink} from './utility';

describe('utility', () => {
    it('should return fr', () => {
        const languageGetter = jest.spyOn(window.navigator, 'language', 'get')
        languageGetter.mockReturnValue('fr-FR')
        expect(getUserLocale(undefined, {})).toEqual('fr');
    });

    it('should return en', () => {
        const languageGetter = jest.spyOn(window.navigator, 'language', 'get')
        languageGetter.mockReturnValue('en')
        expect(getUserLocale(undefined, {})).toEqual('en');
    });

    it('should return null', () => {
        const languageGetter = jest.spyOn(window.navigator, 'language', 'get')
        languageGetter.mockReturnValue('')
        expect(getUserLocale(undefined, {})).toEqual(null);
    });

    it('should return page activities from activities-around', () => {
        expect(getPageFromLink("activities-around", "en", {
            "activities": {
            "name": {
                "en": "Activities",
                "fr": "Activités"
            },
            "page": "activities",
            "type": "page",
            "link": {
                "en": "activities-around",
                "fr": "activite-autour-du-manoir"
            }
        }
        })).toEqual("activities");
    })

    it('should return page activities from activite-autour-du-manoir', () => {
        expect(getPageFromLink("activite-autour-du-manoir", "fr", {
            "rooms": {
                "menus": {
                    "baldaquin": {
                        "name": {
                            "en": "La Baldaquin",
                            "fr": "La Baldaquin"
                        },
                        "type": "page",
                        "link": {
                            "en": "room-la-baldaquin",
                            "fr": "chambre-la-baldaquin"
                        }
                    },
                    "tour": {
                        "name": {
                            "en": "La Tour",
                            "fr": "La Tour"
                        },
                        "page": "chambre-la-tour",
                        "type": "page",
                        "link": {
                            "en": "room-la-tour",
                            "fr": "chambre-la-tour"
                        }
                    }
                },
                "name": {
                    "en": "The Rooms",
                    "fr": "Les Chambres"
                },
                "type": "container"
            },            
            "activities": {
            "name": {
                "en": "Activities",
                "fr": "Activités"
            },
            "page": "activities",
            "type": "page",
            "link": {
                "en": "activities-around",
                "fr": "activite-autour-du-manoir"
            }
        }
        })).toEqual("activities");
    })

    it('should return page tour from room-la-tour en', () => {
        expect(getPageFromLink("room-la-tour", "en", {
            "rooms": {
                "menus": {
                    "baldaquin": {
                        "name": {
                            "en": "La Baldaquin",
                            "fr": "La Baldaquin"
                        },
                        "type": "page",
                        "link": {
                            "en": "room-la-baldaquin",
                            "fr": "chambre-la-baldaquin"
                        }
                    },
                    "tour": {
                        "name": {
                            "en": "La Tour",
                            "fr": "La Tour"
                        },
                        "page": "chambre-la-tour",
                        "type": "page",
                        "link": {
                            "en": "room-la-tour",
                            "fr": "chambre-la-tour"
                        }
                    }
                },
                "name": {
                    "en": "The Rooms",
                    "fr": "Les Chambres"
                },
                "type": "container"
            },            
            "activities": {
            "name": {
                "en": "Activities",
                "fr": "Activités"
            },
            "page": "activities",
            "type": "page",
            "link": {
                "en": "activities-around",
                "fr": "activite-autour-du-manoir"
            }
        }
        })).toEqual("chambre-la-tour");
    })    

});