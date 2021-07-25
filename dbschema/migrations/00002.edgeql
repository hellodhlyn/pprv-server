CREATE MIGRATION m14fk6mclkjk3sl4st7hqtewr5wmhtv5jjcsbb7xnlbxs2rlr5jvla
    ONTO m1t7dcrhe3c4ilp6i7csuatdtuwzxug435mtqi4lbylxawvgmiweaa
{
  ALTER TYPE default::Product {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY slug {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::ProductBrand {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY slug {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::ProductCategory {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY slug {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
