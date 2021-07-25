CREATE MIGRATION m1t7dcrhe3c4ilp6i7csuatdtuwzxug435mtqi4lbylxawvgmiweaa
    ONTO initial
{
  CREATE EXTENSION graphql VERSION '1.0';
  CREATE TYPE default::AuditableEntity {
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY updated_at -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::ProductBrand EXTENDING default::AuditableEntity {
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY slug -> std::str;
  };
  CREATE TYPE default::ProductCategory EXTENDING default::AuditableEntity {
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY slug -> std::str;
  };
  CREATE TYPE default::Rumor EXTENDING default::AuditableEntity {
      CREATE REQUIRED PROPERTY body -> std::str;
      CREATE REQUIRED PROPERTY date -> cal::local_date;
      CREATE REQUIRED PROPERTY headline -> std::str;
      CREATE PROPERTY source -> std::str;
      CREATE PROPERTY source_url -> std::str;
  };
  CREATE TYPE default::Product EXTENDING default::AuditableEntity {
      CREATE LINK brand -> default::ProductBrand;
      CREATE LINK category -> default::ProductCategory;
      CREATE MULTI LINK rumors -> default::Rumor;
      CREATE PROPERTY description -> std::str;
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE PROPERTY release_at -> std::datetime;
      CREATE REQUIRED PROPERTY slug -> std::str;
  };
};
