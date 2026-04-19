package singletonDB;

public class DemoSingletonDB {
    public static void main(String[] args) {
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();

        db1.query("SELECT * FROM users");
        System.out.println(db1 == db2); // true
    }
}
