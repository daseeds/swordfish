import reducer from './locales';
import * as actions from '../actions/actionsTypes';

describe('locales reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            locales: null,
        });
    });


    it('should store the page, locale and content on success', () => {
        expect(reducer({
            loading: false,
            error: null,
            locales: null,
        },{
            type: actions.LOCALES_FETCH_SUCCESS,
            locales: 'all-locales',            
        })).toEqual({
            loading: false,
            error: null,
            locales: 'all-locales',             
        })
    })

    it('should set page loading true on start page fetch', () => {
        expect(reducer({
            loading: false,
            error: 'some-error',
            locales: null,
        },{
            type: actions.LOCALES_FETCH_START,
        })).toEqual({
            loading: true,
            error: 'some-error',
            locales: null,
        })
    })    

    it('should set error and reset loading on failed page fetch', () => {
        expect(reducer({
            loading: true,
            error: null,
            locales: null,
        },{
            type: actions.LOCALES_FETCH_FAILED,
            error: 'some-error'
        })).toEqual({
            loading: false,
            error: 'some-error',
            locales: null,
        })
    })    

});