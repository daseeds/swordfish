import {getUserLocale} from './utility';

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

});