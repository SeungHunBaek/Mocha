import cache from './redis.js';
import assert from 'assert';

describe('redis test!', () => {
    it('set, get',  async () => {
        await cache.set('key1','value1');
        const baek = await cache.get('key1');
        assert.strictEqual('value1', baek);
    });

    it('set, get',  async () => {
        await cache.set('key1','value1');
        const result = await cache.get('key1');
        let baek;
        if(result){
            baek = await cache.get('key1');
        }
        assert.strictEqual('value1', baek);
    });

    it('set, get, delete',  async () => {
        await cache.set('key1','value1');
        const baek = await cache.get('key1');
        await cache.delete('key1');
        assert.strictEqual(null, baek);
    });

    it('set expired, get',  async () => {
        await cache.set('key1','value1', 10);
        setTimeout(async ()=>{
            const baek = await cache.get('key1');
            assert.strictEqual('value1', baek);
        },1100)
    });
});

