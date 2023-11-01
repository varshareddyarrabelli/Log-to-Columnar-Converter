
# Json Based Log to Columnar Converter

It is a simple tool that will convert this JSON-based log to columnar format, i.e., we will create one file per column. 

Example, if we have the following 2 log lines:

{"timestamp": "2022-01-14T00:12:21.000", "Field1": 10, "Field_Doc": {"f1": "xyz"}}

{"timestamp": "2022-01-18T00:15:51.000", "Field_Doc": {"f1": "abc", "f2": 1.7}}

It will generate 4 files:
1. timestamp.column
2. Field1.column
3. Field_Doc.f1.column
4. Field_Doc.f2.column

        Example content of timestamp.column:
        2022-01-14T00:12:21.000
        2022-01-18T00:15:51.000
   
        Example content of Field_Doc.f1.column:
        xyz
        abc

# Installation

    1) Download the zip folder
    
    2) Open it in your favourite IDE
    
    3) Run a local server or a live server for the Html to be loaded.

    4) Upload the text file of logs to be converted.

# Performance Improvements

Optimizing the code can involve various improvements in terms of performance, readability, and maintainability. These are some ideas to optimize the code:

1) Avoid Repeated DOM Queries: Instead of querying the DOM multiple times for the same elements.

2) Improving error handling: Enhance error handling to provide meaningful messages and log errors for debugging purposes.

3) Use a more efficient way to Read Large Files: For very large files, consider using techniques like streaming to read and process data incrementally, reducing memory storage.

4) Batch Processing: Instead of processing each line of the file one by one, you can batch the lines into groups and then process them, which can improve efficiency.

5) Memory Management: For very large files, manage memory more efficiently by releasing resources when they are no longer needed.

