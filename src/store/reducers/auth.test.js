import reducer from './auth';
import * as actions from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
        });
    });

    it('should store the token uppon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,         
        }, {
            type: actions.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,         
        })
    })

    it('should store error on login failed', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,         
        }, {
            type: actions.AUTH_FAILED,
            error: 'some-error'
        })).toEqual({
            token: null,
            userId: null,
            error: 'some-error',
            loading: false,         
        })
    })
});