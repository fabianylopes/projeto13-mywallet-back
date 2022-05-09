export async function records(req, res){
    const { user } = res.locals;

    try {
        const records = user.transaction;
        let sum = 0;

        if(records.length === 0){
            return res.send({records, sum});
        }else{
            records.forEach((r) => {
                if(r.type === 'entry'){
                    sum += parseFloat(r.value);
                }else if(r.type === 'out'){
                    sum -= parseFloat(r.value);
                }
            });
            return res.send({records, sum});
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
