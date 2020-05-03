import reducer from './pages';
import * as actions from '../actions/actionsTypes';

describe('pages reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            locale: null,
            page: null,
            content: null,
        });
    });


    it('should store the page, locale and content on success', () => {
        expect(reducer({
            loading: false,
            error: null,
            locale: null,
            page: null,
            content: null,
        },{
            type: actions.PAGE_FETCH_SUCCESS,
            locale: 'fr',            
            page: 'some-page',
            content: 'some-content'
        })).toEqual({
            loading: false,
            error: null,
            locale: 'fr',            
            page: 'some-page',
            content: 'some-content'               
        })
    })

    it('should set page loading true on start page fetch', () => {
        expect(reducer({
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,
            content: null,
        },{
            type: actions.PAGE_FETCH_START,
        })).toEqual({
            loading: true,
            error: 'some-error',
            locale: null,
            page: null,    
            content: null                
        })
    })    

    it('should set error and reset loading on failed page fetch', () => {
        expect(reducer({
            loading: true,
            error: null,
            locale: null,
            page: null,
            content: null,
        },{
            type: actions.PAGE_FETCH_FAILED,
            error: 'some-error'
        })).toEqual({
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,   
            content: null ,
        })
    })    

});