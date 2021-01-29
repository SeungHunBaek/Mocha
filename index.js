import cache from './redis.js';
import assert from 'assert';

describe('redis test!', () => {
    it('set, get',  async () => {
        cache.set('key1','value1');
        const baek = await cache.get('key1');
        assert.equal('value1', baek);
    });

    it('set expire, get',  async () => {
        cache.set('key1','value1', 10);
        const baek = await cache.get('key1');
        assert.equal('value1', baek);
    });

    it('set expired, get',  async () => {
        cache.set('key1','value1', 10);
        setTimeout(async ()=>{
            const baek = await cache.get('key1');
            assert.equal('value1', baek);
        },1100)
    });
});

