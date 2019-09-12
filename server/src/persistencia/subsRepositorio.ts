import { Subscription } from "../entidades/subscription";
import { SubsModel } from "./subscriptionModel";

export class SubsRepositorio {
    static async novoSubscription(subs: Subscription): Promise<Subscription|false> {
        const consult = await SubsModel.findOne({ endpoint: subs.endpoint }).exec();
        if (consult) {
            return false;
        }
        return await SubsModel.create(subs);
    }

    static async buscarSubs(): Promise<Subscription[]> {
        return await SubsModel.find().exec();
    }
}