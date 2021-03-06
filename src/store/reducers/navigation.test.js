import reducer from './navigation';
import * as actions from '../actions/actionsTypes';

describe('navigation reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            nav: null,
            loading: false,
            error: null,
        });
    });

    it('should store the nav and reset error on success', () => {
        expect(reducer({
            nav: null,
            loading: false,
            error: 'some-error',     
        },{
            type: actions.NAV_FETCH_SUCCESS,
            nav: 'some-nav',            
        })).toEqual({
            nav: 'some-nav',
            loading: false,
            error: null,
        })
    })

    it('should set loading true on start', () => {
        expect(reducer({
            loading: false,
            error: 'some-error',
            nav: null,
        },{
            type: actions.NAV_FETCH_START,
        })).toEqual({
            nav: null,
            loading: true,
            error: 'some-error',
        })
    })    

    it('should set error and reset loading on failed', () => {
        expect(reducer({
            nav: null,
            loading: true,
            error: null,
        },{
            type: actions.NAV_FETCH_FAILED,
            error: 'some-error'
        })).toEqual({
            nav: null,
            loading: false,
            error: 'some-error',
        })
    })    


});