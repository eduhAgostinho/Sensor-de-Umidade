import { Subscription } from "../entidades/subscription";
import { SubsModel } from "./subscriptionModel";

export async function novoSubscription(subs: Subscription): Promise<Subscription | false> {
    const consult = await SubsModel.findOne({ endpoint: subs.endpoint }).exec();
    if (consult) {
        return false;
    }
    return await SubsModel.create(subs);
}

export async function buscarSubs(): Promise<Subscription[]> {
    return await SubsModel.find().exec();
}
