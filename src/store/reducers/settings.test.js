import reducer from './settings';
import * as actions from '../actions/actionsTypes';

describe('settings reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            settings: null,
        });
    });


    it('should store the page, locale and content on success', () => {
        expect(reducer({
            loading: false,
            error: null,
            settings: null,
        },{
            type: actions.SETTINGS_FETCH_SUCCESS,
            settings: 'all-settings',            
        })).toEqual({
            loading: false,
            error: null,
            settings: 'all-settings',             
        })
    })

    it('should set page loading true on start page fetch', () => {
        expect(reducer({
            loading: false,
            error: 'some-error',
            settings: null,
        },{
            type: actions.SETTINGS_FETCH_START,
        })).toEqual({
            loading: true,
            error: 'some-error',
            settings: null,
        })
    })    

    it('should set error and reset loading on failed page fetch', () => {
        expect(reducer({
            loading: true,
            error: null,
            settings: null,
        },{
            type: actions.SETTINGS_FETCH_FAILED,
            error: 'some-error'
        })).toEqual({
            loading: false,
            error: 'some-error',
            settings: null,
        })
    })    

});