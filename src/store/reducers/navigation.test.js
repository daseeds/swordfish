import reducer from './navigation';
import * as actions from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            nav: null,
            loading: false,
            error: null,
            locale: null,
            page: null,
            content: null,
            pageLoading: false
        });
    });

    it('should store the nav and reset error on success', () => {
        expect(reducer({
            nav: null,
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,            
        },{
            type: actions.NAV_FETCH_SUCCESS,
            nav: 'some-nav',            
        })).toEqual({
            nav: 'some-nav',
            loading: false,
            error: null,
            locale: null,
            page: null,                    
        })
    })

    it('should set loading true on start', () => {
        expect(reducer({
            nav: null,
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,            
        },{
            type: actions.NAV_FETCH_START,
        })).toEqual({
            nav: null,
            loading: true,
            error: 'some-error',
            locale: null,
            page: null,                    
        })
    })    

    it('should set error and reset loading on failed', () => {
        expect(reducer({
            nav: null,
            loading: true,
            error: null,
            locale: null,
            page: null,            
        },{
            type: actions.NAV_FETCH_FAILED,
            error: 'some-error'
        })).toEqual({
            nav: null,
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,                    
        })
    })    

    it('should store the page, locale and content on success', () => {
        expect(reducer({
            nav: 'some-nav',
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,
            content: null,
            pageLoading: true,
        },{
            type: actions.NAV_PAGE_LOAD_SUCCESS,
            locale: 'fr',            
            page: 'some-page',
            content: 'some-content'
        })).toEqual({
            nav: 'some-nav',
            loading: false,
            pageLoading: false,
            error: null,
            locale: 'fr',            
            page: 'some-page',
            content: 'some-content'               
        })
    })

    it('should set page loading true on start page fetch', () => {
        expect(reducer({
            nav: null,
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,
            content: null,
            pageLoading: false,
        },{
            type: actions.NAV_PAGE_LOAD_START,
        })).toEqual({
            nav: null,
            loading: false,
            pageLoading: true,
            error: 'some-error',
            locale: null,
            page: null,    
            content: null                
        })
    })    

    it('should set error and reset loading on failed page fetch', () => {
        expect(reducer({
            nav: null,
            loading: false,
            error: null,
            locale: null,
            page: null,   
            content: null,
            pageLoading: true,
        },{
            type: actions.NAV_PAGE_LOAD_FAILED,
            error: 'some-error'
        })).toEqual({
            nav: null,
            loading: false,
            error: 'some-error',
            locale: null,
            page: null,   
            content: null ,
            pageLoading: false                
        })
    })    

});