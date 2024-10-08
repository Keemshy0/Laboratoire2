class Maths_API {
    static API_URL() { return "http://localhost:5000/api/maths" };
    static async Get(id = null) {
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + (id ? "?" + id : ""),
                success: contacts => { resolve(contacts); },
                error: (xhr) => { console.log(xhr); resolve(null); }
            });
        });
    }
}