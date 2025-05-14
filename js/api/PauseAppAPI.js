import { API } from "./API.js";

export class PauseAppAPI extends API {

    static baseUrl = "http://localhost:8080";

    static async login(email, password) {
        return this.POST("/auth/login", { email, password });
    }

    static async register(name, email, password) {
        return this.POST("/auth/register", { name, email, password });
    }

    static async me() {
        return this.GET("/user/me");
    }

    static async getActivities() {
        return this.GET("/activity");
    }

    static async getPremiumActivities() {
        return this.GET("/activity/premium");
    }

    static async getActivityById(id) {
        return this.GET(`/activity/${id}`);
    }

    static async getActivityTypes() {
        return this.GET("/activity/types");
    }

    static async getUsers() {
        return this.GET("/user");
    }

    static async getUser(id) {
        return this.GET(`/user/${id}`);
    }

    static async patchUser(id, body) {
        return this.PATCH(`/user/${id}`, body);
    }

    static async createActivityType(name) {
        return this.POST("/activity/types", { name });
    }

    static async createActivity(formData) {
        return this.FORM("/activity", formData);
    }

    static async addStressLevel(id, level) {
        return this.POST(`/user/${id}/stress-level`, { level });
    }

    static async recordExists({userId, activityId}) {
        return this.POST("/user/record", {
            userId, activityId
        });
    }

    static async createActivityRecord({userId, activityId, status}) {
        return this.POST(`/user/${userId}/record`, {
            activityId,
            status
        });
    }

    static async completeActivity({userId, activityId}) {
        return this.GET(`/user/${userId}/complete-activity/${activityId}`);
    }

    static async sendFriendRequest(senderId, receiverId) {
        return this.POST(`/user/relations`, { senderId, receiverId });
    }

    static async getFriendRequests(id) {
        return this.GET(`/user/relations/received/${id}`);
    }

    static async getSentFriendRequest(id) {
        return this.GET(`/user/relations/sent/${id}`);
    }

    static async getFriends(id) {
        return this.GET(`/user/relations/${id}/friends`);
    }

    static async acceptRequest(id) {
        return this.PATCH(`/user/relations/${id}`, {
            status: true
        });
    }

    static async deleteRelation(id) {
        return this.DELETE(`/user/relations/${id}`);
    }

    static async deleteActivity(id) {
        return this.DELETE(`/activity/${id}`);
    }
}